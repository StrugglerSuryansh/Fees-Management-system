import React, { useState } from 'react';
import { PlusCircle, Search } from 'lucide-react';
import { Dashboard } from './components/Dashboard';
import { StudentTable } from './components/StudentTable';
import { StudentForm } from './components/StudentForm';
import { Student, PaymentStatus } from './types';

// Mock data
const initialStudents: Student[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1234567890',
    course: 'Computer Science',
    totalFees: 50000,
    paidAmount: 50000,
    lastPaymentDate: '2024-03-15',
    status: 'fully_paid',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '+1987654321',
    course: 'Data Science',
    totalFees: 45000,
    paidAmount: 25000,
    lastPaymentDate: '2024-03-10',
    status: 'partially_paid',
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike@example.com',
    phone: '+1122334455',
    course: 'Artificial Intelligence',
    totalFees: 60000,
    paidAmount: 0,
    lastPaymentDate: '2024-03-01',
    status: 'unpaid',
  },
];

function App() {
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [showForm, setShowForm] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | undefined>();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<PaymentStatus>('all');

  const handleAddStudent = (studentData: Omit<Student, 'id' | 'status'>) => {
    const newStudent: Student = {
      ...studentData,
      id: Date.now().toString(),
      status: studentData.paidAmount === 0 
        ? 'unpaid'
        : studentData.paidAmount >= studentData.totalFees
        ? 'fully_paid'
        : 'partially_paid',
    };
    setStudents([...students, newStudent]);
  };

  const handleEditStudent = (studentData: Omit<Student, 'id' | 'status'>) => {
    if (!selectedStudent) return;
    
    const updatedStudent: Student = {
      ...studentData,
      id: selectedStudent.id,
      status: studentData.paidAmount === 0 
        ? 'unpaid'
        : studentData.paidAmount >= studentData.totalFees
        ? 'fully_paid'
        : 'partially_paid',
    };

    setStudents(students.map(s => 
      s.id === selectedStudent.id ? updatedStudent : s
    ));
  };

  const handleDeleteStudent = (id: string) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      setStudents(students.filter(s => s.id !== id));
    }
  };

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.course.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || student.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Student Fee Management</h1>
          <button
            onClick={() => {
              setSelectedStudent(undefined);
              setShowForm(true);
            }}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <PlusCircle className="w-5 h-5 mr-2" />
            Add Student
          </button>
        </div>

        <Dashboard students={students} />

        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search students..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="block w-full sm:w-48 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as PaymentStatus)}
          >
            <option value="all">All Status</option>
            <option value="fully_paid">Fully Paid</option>
            <option value="partially_paid">Partially Paid</option>
            <option value="unpaid">Unpaid</option>
          </select>
        </div>

        <StudentTable
          students={filteredStudents}
          onEdit={(student) => {
            setSelectedStudent(student);
            setShowForm(true);
          }}
          onDelete={handleDeleteStudent}
        />

        {showForm && (
          <StudentForm
            student={selectedStudent}
            onSubmit={selectedStudent ? handleEditStudent : handleAddStudent}
            onClose={() => {
              setShowForm(false);
              setSelectedStudent(undefined);
            }}
          />
        )}
      </div>
    </div>
  );
}

export default App;