import { configRouter } from "../config/route";
import { Home, Register, Login, SpecificCourse, Learning } from "../pages";

const publicRoute = [
  { path: configRouter.home, component: Home },
  { path: configRouter.register, component: Register },
  { path: configRouter.login, component: Login },
  { path: configRouter.specificCourse, component: SpecificCourse },
  { path: configRouter.learnings, component: Learning },
];

export { publicRoute };
