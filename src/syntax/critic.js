import { render } from "critic-markup";

const criticMarkupRule = state => {
  state.src = render(state.src);
};

const markdownItCriticMarkup = md => {
  md.core.ruler.before("block", "critic-markup", criticMarkupRule);
};

export default markdownItCriticMarkup;
