import {
  TrendingUp,
  CheckCircle,
  Clock,
  Sprout,
  Leaf,
  AlertCircle,
} from "lucide-react";
import React from "react";

export const getStatusIcon = (status: string) => {
  switch (status) {
    case "Đang phát triển":
      return <TrendingUp size={16} className="text-emerald-600" />;
    case "Đã thu hoạch":
      return <CheckCircle size={16} className="text-indigo-600" />;
    default:
      return <Clock size={16} className="text-slate-500" />;
  }
};

export const getStageIcon = (stage: string) => {
  switch (stage) {
    case "seedling":
      return <Sprout size={16} className="text-emerald-600" />;
    case "care":
      return <Leaf size={16} className="text-teal-600" />;
    case "protect":
      return <AlertCircle size={16} className="text-amber-600" />;
    case "harvest":
      return <CheckCircle size={16} className="text-indigo-600" />;
    default:
      return <Clock size={16} className="text-slate-500" />;
  }
};

export const getStageColor = (stage: string) => {
  switch (stage) {
    case "seedling":
      return {
        bg: "bg-emerald-50 dark:bg-emerald-950/40",
        border: "border-emerald-200 dark:border-emerald-800",
        dot: "bg-gradient-to-br from-emerald-500 to-emerald-600",
        line: "bg-emerald-300 dark:bg-emerald-700",
      };
    case "care":
      return {
        bg: "bg-teal-50 dark:bg-teal-950/40",
        border: "border-teal-200 dark:border-teal-800",
        dot: "bg-gradient-to-br from-teal-500 to-teal-600",
        line: "bg-teal-300 dark:bg-teal-700",
      };
    case "protect":
      return {
        bg: "bg-amber-50 dark:bg-amber-950/40",
        border: "border-amber-200 dark:border-amber-800",
        dot: "bg-gradient-to-br from-amber-500 to-amber-600",
        line: "bg-amber-300 dark:bg-amber-700",
      };
    case "harvest":
      return {
        bg: "bg-indigo-50 dark:bg-indigo-950/40",
        border: "border-indigo-200 dark:border-indigo-800",
        dot: "bg-gradient-to-br from-indigo-500 to-indigo-600",
        line: "bg-indigo-300 dark:bg-indigo-700",
      };
    default:
      return {
        bg: "bg-slate-50 dark:bg-slate-900/40",
        border: "border-slate-200 dark:border-slate-700",
        dot: "bg-gradient-to-br from-slate-400 to-slate-500",
        line: "bg-slate-300 dark:bg-slate-600",
      };
  }
};

export const getHealthStatus = (temp: number, humidity: number) => {
  if (temp >= 20 && temp <= 30 && humidity >= 40 && humidity <= 80) {
    return {
      status: "Tốt",
      color: "text-emerald-600",
      bg: "bg-emerald-50 dark:bg-emerald-900/20",
      dotColor: "bg-emerald-500",
    };
  } else if (temp >= 15 && temp <= 35 && humidity >= 30 && humidity <= 90) {
    return {
      status: "Trung bình",
      color: "text-amber-600",
      bg: "bg-amber-50 dark:bg-amber-900/20",
      dotColor: "bg-amber-500",
    };
  } else {
    return {
      status: "Cần chú ý",
      color: "text-red-600",
      bg: "bg-red-50 dark:bg-red-900/20",
      dotColor: "bg-red-500",
    };
  }
};
