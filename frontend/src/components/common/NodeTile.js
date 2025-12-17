import React from 'react';
import {
  Database,
  Zap,
  Flag,
  Settings,
  FileText,
  BookOpen,
  Cpu,
  MessageSquare,
  Grid3x3,
} from 'lucide-react';

const iconMap = {
  input: Database,
  trigger: Zap,
  start: Flag,
  browserExtension: Settings,
  output: FileText,
  note: BookOpen,
  group: Grid3x3,
  llm: Cpu,
  chat: MessageSquare,
};

export const NodeTile = ({ type, label, onDragStart }) => {
  const IconComponent = iconMap[type] || Database;
  const [isHovered, setIsHovered] = React.useState(false);
  // Map tile types to ReactFlow registered nodeTypes
  const nodeTypeMap = {
    input: 'customInput',
    output: 'customOutput',
    text: 'text',
    llm: 'llm',
  };

  const handleDragStart = (e) => {
    e.dataTransfer.effectAllowed = 'move';
    const mappedType = nodeTypeMap[type] || type;
    e.dataTransfer.setData(
      'application/reactflow',
      JSON.stringify({ nodeType: mappedType })
    );
    if (onDragStart) {
      onDragStart(type);
    }
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="flex flex-col items-center justify-center p-3 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg hover:border-primary-400 dark:hover:border-primary-500 hover:shadow-md dark:hover:shadow-lg cursor-move transition-all duration-200"
      style={{ 
        width: '140px', 
        height: '80px',
        transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
        transition: 'transform 200ms ease-out'
      }}
    >
      <div className={`p-2 rounded-lg mb-1.5 transition-all duration-200 ${
        isHovered 
          ? 'bg-primary-100 dark:bg-primary-900' 
          : 'bg-neutral-100 dark:bg-neutral-700'
      }`}>
        <IconComponent
          size={20}
          className={`transition-all duration-200 ${
            isHovered 
              ? 'text-primary-600 dark:text-primary-400' 
              : 'text-neutral-700 dark:text-neutral-300'
          }`}
        />
      </div>
      <span className={`text-xs font-medium text-center transition-all duration-200 ${
        isHovered 
          ? 'text-primary-600 dark:text-primary-400' 
          : 'text-neutral-900 dark:text-neutral-100'
      }`}>
        {label}
      </span>
    </div>
  );
};
