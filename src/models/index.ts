import user from './user';
import layout from './layout';
export default function addModel(app) {
  app.model(user);
  app.model(layout);
 
}
