"use client";
import React from 'react';
import Page from './Page/Page';

export default function Nav({ course, formattedTotalTime }) {
  return (
    <>
      <Page course={course} formattedTotalTime={formattedTotalTime} />
    </>
  );
}