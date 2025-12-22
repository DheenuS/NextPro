"use client"

import { AuthContextType } from "@/types/type";
import { createContext } from "react";

export const AuthContext = createContext<AuthContextType | null>(null);