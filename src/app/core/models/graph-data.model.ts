export interface GraphDataModel {
  agreeableness: number,
  drive: number,
  luck: number,
  openness: number,
}

export interface GraphModel {
  type: string,
  data: GraphDataModel,
}
