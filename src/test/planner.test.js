import assert from "node:assert/strict";
import test from "node:test";
import {
  adjustPlan,
  allocateTime,
  calculatePriority,
  generatePlan,
  generateTodayTasks,
} from "../src/planner.js";
import { sampleExams } from "../src/sampleData.js";

const referenceDate = "2026-05-04";

test("calculatePriority ranks high-risk subjects higher", () => {
  const priorities = sampleExams
    .map((exam) => calculatePriority(exam, { referenceDate }))
    .sort((a, b) => b.priority - a.priority);

  assert.equal(priorities[0].subject, "高数");
  assert.equal(priorities[1].subject, "会计学原理");
  assert.ok(priorities[0].priority > priorities.at(-1).priority);
});

test("allocateTime uses the daily budget and gives every active subject time", () => {
  const allocation = allocateTime(sampleExams, 4, { referenceDate });
  const total = allocation.reduce((sum, item) => sum + item.allocatedHours, 0);

  assert.equal(allocation.length, 4);
  assert.ok(Math.abs(total - 4) <= 0.2);
  assert.equal(allocation[0].subject, "高数");
});

test("generatePlan creates a weekly schedule and today's tasks", () => {
  const plan = generatePlan(sampleExams, 4, {
    days: 7,
    referenceDate,
  });
  const todayTasks = generateTodayTasks(plan, { date: referenceDate });

  assert.equal(plan.schedule.length, 7);
  assert.equal(plan.schedule[0].date, referenceDate);
  assert.ok(todayTasks.length > 0);
  assert.ok(todayTasks.some((task) => task.subject === "高数"));
});

test("adjustPlan keeps, compresses, or focuses according to completion rate", () => {
  const plan = generatePlan(sampleExams, 4, {
    days: 2,
    referenceDate,
  });

  assert.equal(adjustPlan(plan, 0.9).strategy, "keep");
  assert.equal(adjustPlan(plan, 0.65).strategy, "compress_low_priority");
  assert.equal(adjustPlan(plan, 0.45).strategy, "focus_high_priority");
});
