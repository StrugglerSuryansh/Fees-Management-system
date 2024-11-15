import React from 'react';
import { PieChart, Users, Wallet } from 'lucide-react';
import { Student } from '../types';

interface DashboardProps {
  students: Student[];
}

export function Dashboard({ students }: DashboardProps) {
  const totalStudents = students.length;
  const totalFees = students.reduce((sum, student) => sum + student.totalFees, 0);
  const collectedFees = students.reduce((sum, student) => sum + student.paidAmount, 0);
  const pendingFees = totalFees - collectedFees;

  const stats = [
    {
      title: 'Total Students',
      value: totalStudents,
      icon: Users,
      color: 'bg-blue-500',
    },
    {
      title: 'Collected Fees',
      value: `₹${collectedFees.toLocaleString()}`,
      icon: Wallet,
      color: 'bg-green-500',
    },
    {
      title: 'Pending Fees',
      value: `₹${pendingFees.toLocaleString()}`,
      icon: PieChart,
      color: 'bg-red-500',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {stats.map((stat) => (
        <div
          key={stat.title}
          className="bg-white rounded-xl shadow-sm p-6 transition-transform hover:scale-105"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">{stat.title}</p>
              <p className="text-2xl font-bold mt-2">{stat.value}</p>
            </div>
            <div className={`${stat.color} p-4 rounded-lg`}>
              <stat.icon className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}