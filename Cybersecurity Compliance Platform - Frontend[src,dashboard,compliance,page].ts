'use client';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';
import { ComplianceFrameworkCard } from '@/components/compliance/framework-card';
import { ComplianceStatusChart } from '@/components/charts/compliance-status';
import { RiskHeatmap } from '@/components/charts/risk-heatmap';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { frameworks } from '@/constants/compliance-frameworks';
gsap.registerPlugin(ScrollTrigger);
export default function ComplianceDashboard() {
  const sectionRef = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.framework-card', {
        opacity: 0,
        y: 50,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
      });
      gsap.from('.chart-container', {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
          trigger: '.chart-container',
          start: 'top 80%',
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      ref={sectionRef}
      className="space-y-6"
    >
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {frameworks.map((framework, index) => (
          <ComplianceFrameworkCard
            key={framework.id}
            framework={framework}
            className="framework-card"
            style={{ animationDelay: `${index * 0.1}s` }}
          />
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="chart-container">
          <CardHeader>
            <CardTitle>Compliance Status</CardTitle>
          </CardHeader>
          <CardContent>
            <ComplianceStatusChart />
          </CardContent>
        </Card>
        <Card className="chart-container">
          <CardHeader>
            <CardTitle>Risk Heatmap</CardTitle>
          </CardHeader>
          <CardContent>
            <RiskHeatmap />
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-1">
        <Card className="chart-container">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Global Compliance Map</CardTitle>
              <Button variant="outline">Export Report</Button>
            </div>
          </CardHeader>
          <CardContent className="h-[500px]">
            {/* Map component would go here */}
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}