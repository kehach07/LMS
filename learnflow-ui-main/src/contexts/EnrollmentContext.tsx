import React, { createContext, useContext, useState, useCallback } from "react";
import { Enrollment } from "@/types/lms";
import { enrollments as initialEnrollments } from "@/data/mockData";

interface EnrollmentContextType {
  enrollments: Enrollment[];
  enroll: (studentId: string, courseId: string) => void;
  completeLesson: (studentId: string, courseId: string, lessonId: string) => void;
  isEnrolled: (studentId: string, courseId: string) => boolean;
  getEnrollment: (studentId: string, courseId: string) => Enrollment | undefined;
}

const EnrollmentContext = createContext<EnrollmentContextType>({
  enrollments: [],
  enroll: () => {},
  completeLesson: () => {},
  isEnrolled: () => false,
  getEnrollment: () => undefined,
});

export const useEnrollment = () => useContext(EnrollmentContext);

export const EnrollmentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [enrollments, setEnrollments] = useState<Enrollment[]>(initialEnrollments);

  const enroll = useCallback((studentId: string, courseId: string) => {
    setEnrollments(prev => {
      if (prev.some(e => e.studentId === studentId && e.courseId === courseId)) return prev;
      return [...prev, { studentId, courseId, completedLessonIds: [], enrolledAt: new Date().toISOString().split("T")[0] }];
    });
  }, []);

  const completeLesson = useCallback((studentId: string, courseId: string, lessonId: string) => {
    setEnrollments(prev =>
      prev.map(e => {
        if (e.studentId !== studentId || e.courseId !== courseId) return e;
        if (e.completedLessonIds.includes(lessonId)) return e;
        return { ...e, completedLessonIds: [...e.completedLessonIds, lessonId] };
      })
    );
  }, []);

  const isEnrolled = useCallback((studentId: string, courseId: string) =>
    enrollments.some(e => e.studentId === studentId && e.courseId === courseId), [enrollments]);

  const getEnrollment = useCallback((studentId: string, courseId: string) =>
    enrollments.find(e => e.studentId === studentId && e.courseId === courseId), [enrollments]);

  return (
    <EnrollmentContext.Provider value={{ enrollments, enroll, completeLesson, isEnrolled, getEnrollment }}>
      {children}
    </EnrollmentContext.Provider>
  );
};
