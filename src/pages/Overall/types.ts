enum EmployeeStatus{
  ACTIVE,
  INACTIVE
}

enum EmployeePosition{
  MANAGER,
  DEVELOPER,
  DESIGNER,
  TESTER,
  DEVOPS
}

export interface Employee{
  _id:string
  Name:string
  NationalId:string
  Phone:string
  Email:string
  DateOfBirth:string
  Status: EmployeeStatus
  Position: EmployeePosition,
  isVerified: boolean,
  Code: string
}
