import { render } from "critic-markup";

function criticMarkupRule(state) {
  state.src = render(state.src);
}

function markdownItCriticMarkup(md) {
  md.core.ruler.before("block", "critic-markup", criticMarkupRule);
}

export default markdownItCriticMarkup;
