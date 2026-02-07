'use client';

import { TrendingUp, DollarSign, Clock, Users } from 'lucide-react';

export default function StatsBar() {
  const stats = [
    {
      icon: <TrendingUp className="text-success" size={32} />,
      value: '15-20%',
      label: 'Revenue Increase',
      color: 'text-success'
    },
    {
      icon: <DollarSign className="text-heritage-red" size={32} />,
      value: '8-10%',
      label: 'Cost Reduction',
      color: 'text-heritage-red'
    },
    {
      icon: <Clock className="text-tech-blue" size={32} />,
      value: '4-6 Month',
      label: 'ROI Timeline',
      color: 'text-tech-blue'
    },
    {
      icon: <Users className="text-heritage-gold" size={32} />,
      value: '95%',
      label: 'Owner Satisfaction',
      color: 'text-heritage-gold'
    }
  ];

  return (
    <section className="section-padding bg-white border-b">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="flex justify-center mb-4">
                <div className="bg-gray-50 p-4 rounded-full group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>
              </div>
              <div className={`text-4xl font-bold mb-2 ${stat.color}`}>
                {stat.value}
              </div>
              <div className="text-gray-600 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
