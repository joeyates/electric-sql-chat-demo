import { z } from 'zod';
import type { Prisma } from './prismaClient';
import { type TableSchema, DbSchema, Relation, ElectricClient, type HKT } from 'electric-sql/client/model';
import migrations from './migrations';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const MessagesScalarFieldEnumSchema = z.enum(['id','text','user_id','time','username']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);
/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// MESSAGES SCHEMA
/////////////////////////////////////////

export const MessagesSchema = z.object({
  id: z.string().uuid(),
  text: z.string().nullable(),
  user_id: z.string().uuid().nullable(),
  time: z.coerce.date().nullable(),
  username: z.string(),
})

export type Messages = z.infer<typeof MessagesSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// MESSAGES
//------------------------------------------------------

export const MessagesSelectSchema: z.ZodType<Prisma.MessagesSelect> = z.object({
  id: z.boolean().optional(),
  text: z.boolean().optional(),
  user_id: z.boolean().optional(),
  time: z.boolean().optional(),
  username: z.boolean().optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const MessagesWhereInputSchema: z.ZodType<Prisma.MessagesWhereInput> = z.object({
  AND: z.union([ z.lazy(() => MessagesWhereInputSchema),z.lazy(() => MessagesWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => MessagesWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MessagesWhereInputSchema),z.lazy(() => MessagesWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  text: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  user_id: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
  time: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  username: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const MessagesOrderByWithRelationInputSchema: z.ZodType<Prisma.MessagesOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  text: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  time: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const MessagesWhereUniqueInputSchema: z.ZodType<Prisma.MessagesWhereUniqueInput> = z.object({
  id: z.string().uuid().optional()
}).strict();

export const MessagesOrderByWithAggregationInputSchema: z.ZodType<Prisma.MessagesOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  text: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  time: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => MessagesCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => MessagesMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => MessagesMinOrderByAggregateInputSchema).optional()
}).strict();

export const MessagesScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.MessagesScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => MessagesScalarWhereWithAggregatesInputSchema),z.lazy(() => MessagesScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => MessagesScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MessagesScalarWhereWithAggregatesInputSchema),z.lazy(() => MessagesScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  text: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  user_id: z.union([ z.lazy(() => UuidNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  time: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  username: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const MessagesCreateInputSchema: z.ZodType<Prisma.MessagesCreateInput> = z.object({
  id: z.string().uuid(),
  text: z.string().optional().nullable(),
  user_id: z.string().uuid().optional().nullable(),
  time: z.coerce.date().optional().nullable(),
  username: z.string()
}).strict();

export const MessagesUncheckedCreateInputSchema: z.ZodType<Prisma.MessagesUncheckedCreateInput> = z.object({
  id: z.string().uuid(),
  text: z.string().optional().nullable(),
  user_id: z.string().uuid().optional().nullable(),
  time: z.coerce.date().optional().nullable(),
  username: z.string()
}).strict();

export const MessagesUpdateInputSchema: z.ZodType<Prisma.MessagesUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_id: z.union([ z.string().uuid(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  time: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const MessagesUncheckedUpdateInputSchema: z.ZodType<Prisma.MessagesUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_id: z.union([ z.string().uuid(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  time: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const MessagesCreateManyInputSchema: z.ZodType<Prisma.MessagesCreateManyInput> = z.object({
  id: z.string().uuid(),
  text: z.string().optional().nullable(),
  user_id: z.string().uuid().optional().nullable(),
  time: z.coerce.date().optional().nullable(),
  username: z.string()
}).strict();

export const MessagesUpdateManyMutationInputSchema: z.ZodType<Prisma.MessagesUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_id: z.union([ z.string().uuid(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  time: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const MessagesUncheckedUpdateManyInputSchema: z.ZodType<Prisma.MessagesUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_id: z.union([ z.string().uuid(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  time: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UuidFilterSchema: z.ZodType<Prisma.UuidFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedUuidFilterSchema) ]).optional(),
}).strict();

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const UuidNullableFilterSchema: z.ZodType<Prisma.UuidNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedUuidNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const DateTimeNullableFilterSchema: z.ZodType<Prisma.DateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const MessagesCountOrderByAggregateInputSchema: z.ZodType<Prisma.MessagesCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  text: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  time: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const MessagesMaxOrderByAggregateInputSchema: z.ZodType<Prisma.MessagesMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  text: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  time: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const MessagesMinOrderByAggregateInputSchema: z.ZodType<Prisma.MessagesMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  text: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  time: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UuidWithAggregatesFilterSchema: z.ZodType<Prisma.UuidWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedUuidWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const UuidNullableWithAggregatesFilterSchema: z.ZodType<Prisma.UuidNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedUuidNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const DateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional()
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable()
}).strict();

export const NullableDateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableDateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional().nullable()
}).strict();

export const NestedUuidFilterSchema: z.ZodType<Prisma.NestedUuidFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedUuidFilterSchema) ]).optional(),
}).strict();

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedUuidNullableFilterSchema: z.ZodType<Prisma.NestedUuidNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedUuidNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedDateTimeNullableFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const NestedUuidWithAggregatesFilterSchema: z.ZodType<Prisma.NestedUuidWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedUuidWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedUuidNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedUuidNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedUuidNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const NestedDateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional()
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const MessagesFindFirstArgsSchema: z.ZodType<Prisma.MessagesFindFirstArgs> = z.object({
  select: MessagesSelectSchema.optional(),
  where: MessagesWhereInputSchema.optional(),
  orderBy: z.union([ MessagesOrderByWithRelationInputSchema.array(),MessagesOrderByWithRelationInputSchema ]).optional(),
  cursor: MessagesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: MessagesScalarFieldEnumSchema.array().optional(),
}).strict() 

export const MessagesFindFirstOrThrowArgsSchema: z.ZodType<Prisma.MessagesFindFirstOrThrowArgs> = z.object({
  select: MessagesSelectSchema.optional(),
  where: MessagesWhereInputSchema.optional(),
  orderBy: z.union([ MessagesOrderByWithRelationInputSchema.array(),MessagesOrderByWithRelationInputSchema ]).optional(),
  cursor: MessagesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: MessagesScalarFieldEnumSchema.array().optional(),
}).strict() 

export const MessagesFindManyArgsSchema: z.ZodType<Prisma.MessagesFindManyArgs> = z.object({
  select: MessagesSelectSchema.optional(),
  where: MessagesWhereInputSchema.optional(),
  orderBy: z.union([ MessagesOrderByWithRelationInputSchema.array(),MessagesOrderByWithRelationInputSchema ]).optional(),
  cursor: MessagesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: MessagesScalarFieldEnumSchema.array().optional(),
}).strict() 

export const MessagesAggregateArgsSchema: z.ZodType<Prisma.MessagesAggregateArgs> = z.object({
  where: MessagesWhereInputSchema.optional(),
  orderBy: z.union([ MessagesOrderByWithRelationInputSchema.array(),MessagesOrderByWithRelationInputSchema ]).optional(),
  cursor: MessagesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() 

export const MessagesGroupByArgsSchema: z.ZodType<Prisma.MessagesGroupByArgs> = z.object({
  where: MessagesWhereInputSchema.optional(),
  orderBy: z.union([ MessagesOrderByWithAggregationInputSchema.array(),MessagesOrderByWithAggregationInputSchema ]).optional(),
  by: MessagesScalarFieldEnumSchema.array(),
  having: MessagesScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() 

export const MessagesFindUniqueArgsSchema: z.ZodType<Prisma.MessagesFindUniqueArgs> = z.object({
  select: MessagesSelectSchema.optional(),
  where: MessagesWhereUniqueInputSchema,
}).strict() 

export const MessagesFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.MessagesFindUniqueOrThrowArgs> = z.object({
  select: MessagesSelectSchema.optional(),
  where: MessagesWhereUniqueInputSchema,
}).strict() 

export const MessagesCreateArgsSchema: z.ZodType<Prisma.MessagesCreateArgs> = z.object({
  select: MessagesSelectSchema.optional(),
  data: z.union([ MessagesCreateInputSchema,MessagesUncheckedCreateInputSchema ]),
}).strict() 

export const MessagesUpsertArgsSchema: z.ZodType<Prisma.MessagesUpsertArgs> = z.object({
  select: MessagesSelectSchema.optional(),
  where: MessagesWhereUniqueInputSchema,
  create: z.union([ MessagesCreateInputSchema,MessagesUncheckedCreateInputSchema ]),
  update: z.union([ MessagesUpdateInputSchema,MessagesUncheckedUpdateInputSchema ]),
}).strict() 

export const MessagesCreateManyArgsSchema: z.ZodType<Prisma.MessagesCreateManyArgs> = z.object({
  data: MessagesCreateManyInputSchema.array(),
  skipDuplicates: z.boolean().optional(),
}).strict() 

export const MessagesDeleteArgsSchema: z.ZodType<Prisma.MessagesDeleteArgs> = z.object({
  select: MessagesSelectSchema.optional(),
  where: MessagesWhereUniqueInputSchema,
}).strict() 

export const MessagesUpdateArgsSchema: z.ZodType<Prisma.MessagesUpdateArgs> = z.object({
  select: MessagesSelectSchema.optional(),
  data: z.union([ MessagesUpdateInputSchema,MessagesUncheckedUpdateInputSchema ]),
  where: MessagesWhereUniqueInputSchema,
}).strict() 

export const MessagesUpdateManyArgsSchema: z.ZodType<Prisma.MessagesUpdateManyArgs> = z.object({
  data: z.union([ MessagesUpdateManyMutationInputSchema,MessagesUncheckedUpdateManyInputSchema ]),
  where: MessagesWhereInputSchema.optional(),
}).strict() 

export const MessagesDeleteManyArgsSchema: z.ZodType<Prisma.MessagesDeleteManyArgs> = z.object({
  where: MessagesWhereInputSchema.optional(),
}).strict() 

interface MessagesGetPayload extends HKT {
  readonly _A?: boolean | null | undefined | Prisma.MessagesArgs
  readonly type: Prisma.MessagesGetPayload<this['_A']>
}

export const tableSchemas = {
  messages: {
    fields: new Map([
      [
        "id",
        "UUID"
      ],
      [
        "text",
        "TEXT"
      ],
      [
        "user_id",
        "UUID"
      ],
      [
        "time",
        "TIMESTAMP"
      ],
      [
        "username",
        "TEXT"
      ]
    ]),
    relations: [
    ],
    modelSchema: (MessagesCreateInputSchema as any)
      .partial()
      .or((MessagesUncheckedCreateInputSchema as any).partial()),
    createSchema: MessagesCreateArgsSchema,
    createManySchema: MessagesCreateManyArgsSchema,
    findUniqueSchema: MessagesFindUniqueArgsSchema,
    findSchema: MessagesFindFirstArgsSchema,
    updateSchema: MessagesUpdateArgsSchema,
    updateManySchema: MessagesUpdateManyArgsSchema,
    upsertSchema: MessagesUpsertArgsSchema,
    deleteSchema: MessagesDeleteArgsSchema,
    deleteManySchema: MessagesDeleteManyArgsSchema
  } as TableSchema<
    z.infer<typeof MessagesCreateInputSchema>,
    Prisma.MessagesCreateArgs['data'],
    Prisma.MessagesUpdateArgs['data'],
    Prisma.MessagesFindFirstArgs['select'],
    Prisma.MessagesFindFirstArgs['where'],
    Prisma.MessagesFindUniqueArgs['where'],
    never,
    Prisma.MessagesFindFirstArgs['orderBy'],
    Prisma.MessagesScalarFieldEnum,
    MessagesGetPayload
  >,
}

export const schema = new DbSchema(tableSchemas, migrations)
export type Electric = ElectricClient<typeof schema>
