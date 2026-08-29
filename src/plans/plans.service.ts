import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

type Plan = Prisma.PlanGetPayload<{}>;

@Injectable()
export class PlansService {
  constructor(private prisma: PrismaService) {}

  async create(data: any): Promise<Plan> {
    return this.prisma.plan.create({
      data,
    });
  }

  async findAll(): Promise<Plan[]> {
    return this.prisma.plan.findMany();
  }

  async findOne(id: number): Promise<Plan> {
    const plan = await this.prisma.plan.findUnique({
      where: { id },
    });
    if (!plan) {
      throw new NotFoundException(`Plan com ID ${id} não encontrado.`);
    }
    return plan;
  }

  async update(id: number, data: any): Promise<Plan> {
    await this.findOne(id);
    return this.prisma.plan.update({
      where: { id },
      data,
    });
  }

  async remove(id: number): Promise<Plan> {
    await this.findOne(id);
    return this.prisma.plan.delete({
      where: { id },
    });
  }
}