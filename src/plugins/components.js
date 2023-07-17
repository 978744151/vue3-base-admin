import svgIcon from '@/components/svg-icon.vue'
import nodeWrap from '@/components/nodeWrap.vue'
import addNode from '@/components/addNode.vue'
const Components = {
  svgIcon,
  nodeWrap, addNode
};

export const registerComponents = (app) => {
  Object.keys(Components).forEach((key) => {
    app.component(key, Components[key]);
  });
};