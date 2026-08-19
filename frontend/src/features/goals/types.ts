export interface Goal {
  id: string;
  name: string;
  targetAmount: string;
  monthlyContribution: string;
  savedAmount: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export interface CreateGoalPayload {
  name: string;
  targetAmount: number;
  monthlyContribution: number;
}

export type UpdateGoalPayload = Partial<CreateGoalPayload>;
