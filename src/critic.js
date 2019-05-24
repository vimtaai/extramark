import { renderCriticMarkup } from "critic-markup";

const criticMarkupRule = state => {
  state.src = renderCriticMarkup(state.src);
};

const markdownItCriticMarkup = md => {
  md.core.ruler.before("block", "critic-markup", criticMarkupRule);
};

export default markdownItCriticMarkup;
