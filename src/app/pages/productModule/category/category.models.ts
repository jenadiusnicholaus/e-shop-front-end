// export interface CategoryModel {
//     success: boolean
//     status_code: number
//     message: string
//     data: Data
//   }
  
//   export interface Data {
//     categories: Category[]
//   }
  
//   export interface Category {
//     id: number
//     name: string
//     description: string
//     status: string
//   }

  export interface CategoryModel {
    count: number
    next: string
    previous: any
    page_size: Number
    page_number: number
    results: Result[]
  }
  
  export interface Result {
    id: number
    name: string
    description: string
    status: string
  
  }


  export interface CategoryDetails {
    success: boolean
    status_code: number
    message: string
    data: Data
  }
  
  export interface Data {
    id: number
    name: string
    description: string
    status: string
  }
  
  
  