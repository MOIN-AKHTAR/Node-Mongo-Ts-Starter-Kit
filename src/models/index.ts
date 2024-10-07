import {
  Model,
  Document,
  FilterQuery,
  QueryOptions,
  UpdateQuery,
  PipelineStage,
  Aggregate,
} from 'mongoose';
type BulkWriteOperation<T extends Document> = {
  updateOne?: {
    filter: Partial<T>;
    update: Partial<T> | { $set: Partial<T>; $unset?: Partial<T> };
    upsert?: boolean;
  };
};

export const ModelFunctions = <TDocument extends Document>(
  model: Model<TDocument>
) => {
  const create = async (values: Partial<TDocument>): Promise<string> => {
    const doc = await model.create(values);
    //   @ts-ignore
    return doc._id.toString();
  };
  const createReturnBody = async (
    values: Partial<TDocument>
  ): Promise<Partial<TDocument>> => {
    const doc = await model.create(values);
    return doc as Partial<TDocument>;
  };
  const exists = async (
    filterValue: FilterQuery<Partial<TDocument>>
  ): Promise<boolean> => !!(await model.exists(filterValue));
  const findOne = async (
    filterQuery: FilterQuery<Partial<TDocument>>,
    options?: QueryOptions<Partial<TDocument>>
    // select?: string
  ): Promise<Partial<TDocument> | null> =>
    await model.findOne(filterQuery, undefined, options).lean<TDocument>();
  const findOneAndUpdate = async (
    filterQuery: FilterQuery<Partial<TDocument>>,
    values: UpdateQuery<Partial<TDocument>>,
    options: QueryOptions<Partial<TDocument>> = {}
  ): Promise<TDocument | null> => {
    // @ts-ignore
    return await model
      .findOneAndUpdate(filterQuery, values, { ...options, new: true })
      .lean();
  };
  const findAll = async (
    filterObject: FilterQuery<Partial<TDocument>>,
    options: QueryOptions<Partial<TDocument>> = {}
  ): Promise<TDocument[] | []> => {
    // @ts-ignore
    return await model.find(filterObject as any, undefined, options).lean();
  };
  const deleteDoc = async (
    filterObj: FilterQuery<Partial<TDocument>>,
    options: QueryOptions = {}
  ): Promise<boolean> =>
    (await model.findOneAndDelete(filterObj, options).exec()) != null;
  const updateMany = async (
    filter: FilterQuery<Partial<TDocument>>,
    update: UpdateQuery<Partial<TDocument>>,
    queryOptions: QueryOptions<Partial<TDocument>>
  ) => {
    return await model.updateMany(filter, update, queryOptions as any);
  };
  async function deleteMany<TDocument>(
    filter: FilterQuery<Partial<TDocument>>
  ) {
    return await model.deleteMany(filter);
  }
  async function bulkInsert<TDocument>(documents: TDocument[]) {
    return await model.insertMany(documents);
  }
  async function bulkWrite<TDocument extends Document>(
    operations: Array<BulkWriteOperation<TDocument>>
  ) {
    return await model.bulkWrite(operations as any);
  }
  const aggregate = async (
    pipeline: PipelineStage[]
  ): Promise<Aggregate<TDocument>[]> => {
    return await model.aggregate(pipeline).exec();
  };
  const countDoc = async (
    filterObject: FilterQuery<Partial<TDocument>>
  ): Promise<number> => {
    return await model.countDocuments(filterObject);
  };
  return {
    create,
    exists,
    findAll,
    findOne,
    findOneAndUpdate,
    deleteDoc,
    countDoc,
    aggregate,
    updateMany,
    deleteMany,
    bulkInsert,
    bulkWrite,
    createReturnBody,
  };
};
