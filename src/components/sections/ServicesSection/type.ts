import React from 'react'

export interface Service {
  id: number;
  title: string;
  description: string;
  items: string[];
  color: string;
  iconBg: string;
  icon?: React.ReactNode;
  detailedDescription: string;
  imageUrl?: string;
}