export interface UserAssessmentGraphDataModel {
  agreeableness: number,
  drive: number,
  luck: number,
  openness: number,
}

export interface UserAssessmentGraphModel {
  type: string,
  data: UserAssessmentGraphDataModel,
}
