import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Framework } from '@/types/compliance';
import { CheckCircle2, AlertCircle, Clock } from 'lucide-react';
interface FrameworkCardProps extends React.HTMLAttributes<HTMLDivElement> {
  framework: Framework;
}
export function ComplianceFrameworkCard({ framework, className, ...props }: FrameworkCardProps) {
  const getStatusIcon = () => {
    switch (framework.status) {
      case 'compliant':
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case 'partial':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      case 'non-compliant':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };
  return (
    <Card className={className} {...props}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{framework.name}</CardTitle>
        <Badge variant={framework.status === 'compliant' ? 'success' : 'warning'}>
          {framework.status}
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2">
          {getStatusIcon()}
          <Progress value={framework.compliancePercentage} className="h-2" />
          <span className="text-sm text-muted-foreground">
            {framework.compliancePercentage}%
          </span>
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          Last assessed: {framework.lastAssessed}
        </p>
      </CardContent>
      <CardFooter>
        <div className="flex flex-wrap gap-1">
          {framework.controls.map((control) => (
            <Badge key={control} variant="outline" className="text-xs">
              {control}
            </Badge>
          ))}
        </div>
      </CardFooter>
    </Card>
  );
}