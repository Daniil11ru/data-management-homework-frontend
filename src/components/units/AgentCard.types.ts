export interface AgentCardProps {
  image: string;
  type: string;
  name: string;
  sales: number;
  phone: string;
  priority: number;
  discount: number;
  placeholderImage?: string;
}

export interface AgentCardSelectableProps extends AgentCardProps {
  isSelected: boolean;
  onClick: () => void;
}
