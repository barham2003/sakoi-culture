import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}



const BP_REGEX = /\(([^)]+)\)/

export function catchDBError(e: any) {
  if (e.code === "23505") {
    let duplicatedField = e.detail.match(BP_REGEX)[1]
    return `${duplicatedField} is duplicated`
  }
  console.error(e)
  return "Something went wrong"
}


export const responseOptions = {
  status: 200, headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  }
}