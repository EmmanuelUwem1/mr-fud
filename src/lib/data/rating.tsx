"use client";
import { useMemo } from "react";

export default function useUseRating() {
    const rating = useMemo(() => Math.floor(Math.random() * 101), []);
    return rating;
}