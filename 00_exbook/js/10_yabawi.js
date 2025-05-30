import gsap from "https://cdn.jsdelivr.net/npm/gsap@3.13.0/index.js";
import { MotionPathPlugin } from "https://cdn.jsdelivr.net/npm/gsap@3.13.0/MotionPathPlugin.min.js";
gsap.registerPlugin(MotionPathPlugin);

const swapSteps = [
  [
    [".obj_1", ".obj_2"],
    [".obj_3", ".obj_2"],
    [".obj_1", ".obj_3"],
    [".obj_2", ".obj_1"],
    [".obj_3", ".obj_2"]
  ],
  [
    [".obj_1", ".obj_3"],
    [".obj_2", ".obj_3"],
    [".obj_3", ".obj_1"],
    [".obj_2", ".obj_1"],
    [".obj_1", ".obj_3"]
  ],
  [
    [".obj_2", ".obj_3"],
    [".obj_1", ".obj_2"],
    [".obj_3", ".obj_1"],
    [".obj_2", ".obj_3"],
    [".obj_1", ".obj_2"]
  ],
  [
    [".obj_3", ".obj_1"],
    [".obj_2", ".obj_1"],
    [".obj_1", ".obj_2"],
    [".obj_3", ".obj_2"],
    [".obj_1", ".obj_3"]
  ],
  [
    [".obj_1", ".obj_2"],
    [".obj_2", ".obj_3"],
    [".obj_3", ".obj_1"],
    [".obj_1", ".obj_2"],
    [".obj_2", ".obj_3"]
  ],
  [
    [".obj_2", ".obj_1"],
    [".obj_3", ".obj_1"],
    [".obj_2", ".obj_3"],
    [".obj_1", ".obj_2"],
    [".obj_3", ".obj_2"]
  ],
  [
    [".obj_3", ".obj_2"],
    [".obj_1", ".obj_2"],
    [".obj_3", ".obj_1"],
    [".obj_2", ".obj_3"],
    [".obj_1", ".obj_2"]
  ],
  [
    [".obj_1", ".obj_3"],
    [".obj_3", ".obj_2"],
    [".obj_2", ".obj_1"],
    [".obj_3", ".obj_1"],
    [".obj_1", ".obj_2"]
  ],
  [
    [".obj_2", ".obj_3"],
    [".obj_1", ".obj_2"],
    [".obj_3", ".obj_2"],
    [".obj_1", ".obj_3"],
    [".obj_2", ".obj_1"]
  ],
  [
    [".obj_1", ".obj_2"],
    [".obj_1", ".obj_3"],
    [".obj_2", ".obj_3"],
    [".obj_3", ".obj_1"],
    [".obj_2", ".obj_1"]
  ]
];

function getTranslateX(selector) {
  const el = document.querySelector(selector);
  const style = window.getComputedStyle(el);
  const matrix = new DOMMatrixReadOnly(style.transform);
  return matrix.m41;
}

function yabawi(from, to, y) {
  const fromX = getTranslateX(from);
  const toX = getTranslateX(to);
  const dx = toX - fromX;
  // console.log(fromX);

  return {
    target: from,
    from: { x: fromX, y: 0 },
    to: {
      duration: 0.3,
      ease: "power1.inOut",
      motionPath: {
        path: [
          { x: fromX, y: 0 },
          { x: fromX + dx / 2, y: y },
          { x: fromX + dx, y: 0 }
        ],
        curviness: 4
      },
      onComplete: () => { }
    }
  };
}

function runSteps(steps, index = 0) {
  if (index >= steps.length) return

  const [a, b] = steps[index];
  const tl = gsap.timeline();

  const moveUp = yabawi(a, b, -60);
  const moveDown = yabawi(b, a, 60);

  tl.fromTo(moveUp.target, moveUp.from, moveUp.to, 0)
    .fromTo(moveDown.target, moveDown.from, moveDown.to, 0)
    .add(() => {
      runSteps(steps, index + 1);
    });
}


document.querySelector(".btn").addEventListener("click", () => {
  const random = Math.floor(Math.random() * swapSteps.length);
  const steps = swapSteps[random];
  runSteps(steps);
});

// const swapSteps = makeRandomSteps(5);
// console.log(swapSteps);
// runSteps(swapSteps);

// function makeRandomSteps(count) {
//  const cups = [".obj_1", ".obj_2", ".obj_3"];
//  const steps = [];

//  for (let i = 0; i < count; i++) {
//   let a, b;
//   do {
//    const shuffled = [...cups].sort(() => Math.random() - 0.5);
//    [a, b] = [shuffled[0], shuffled[1]];
//   } while (a === b);

//   steps.push([a, b]);
//  }

//  return steps;
// }
