import { configRouter } from "../config/route";
import {
  Home,
  Register,
  Login,
  SpecificCourse,
  Learning,
  Quiz,
  Payment,
  Profile,
  Teacher,
  CourseCategory,
  CourseMe,
  HistoryLearn,
  ForgetPassword,
} from "../pages";

const publicRoute = [
  { path: configRouter.home, component: Home },
  { path: configRouter.register, component: Register },
  { path: configRouter.login, component: Login },
  { path: configRouter.specificCourse, component: SpecificCourse },
  { path: configRouter.learnings, component: Learning },
  { path: configRouter.quiz, component: Quiz },
  { path: configRouter.payment, component: Payment },
  { path: configRouter.profile, component: Profile },
  { path: configRouter.teacher, component: Teacher },
  { path: configRouter.CourseCategory, component: CourseCategory },
  { path: configRouter.CourseMe, component: CourseMe },
  { path: configRouter.HistoryLearn, component: HistoryLearn },
  { path: configRouter.ForgetPassword, component: ForgetPassword },
];

export { publicRoute };
