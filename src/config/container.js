export const containerConfig = {
  validate: () => true,
  render: (tokens, idx) => {
    if (tokens[idx].type === "container__open") {
      const classList = tokens[idx].info.trim();
      return `<div ${classList ? `class="${classList}"` : ``}>`;
    } else {
      return `</div>`;
    }
  }
};
