const tags = {
  addition: {
    open: "{++",
    close: "++}",
    render(content) {
      return content.trim() === ""
        ? `\n<ins class="break">&nbsp;</ins>\n`
        : `<ins>${content}</ins>`;
    }
  },
  deletion: {
    open: "{--",
    close: "--}",
    render(content) {
      return content.trim() === "" ? `<del>&nbsp;</del>` : `<del>${content}</del>`;
    }
  },
  substitution: {
    open: "{~~",
    close: "~~}",
    render(content) {
      const split = content.split("~>");

      if (split.length === 1) {
        return this.open + content + this.close;
      }

      const [before, ...rest] = split;
      const after = rest.join("~>");
      return `${tags.deletion.render(before)}${tags.addition.render(after)}`;
    }
  },
  comment: {
    open: "{>>",
    close: "<<}",
    render(content) {
      return `<span class="critic content">${content}</span>`;
    }
  },
  hightlight: {
    open: "{==",
    close: "==}",
    render(content) {
      return `<mark>${content}</mark>`;
    }
  }
};

const regex = /({\+\+.*?\+\+}|{--.*?--}|{~~.*?~~}|{==.*?==}|{>>.*?<<})/gs;

const replaceCriticMarkup = match => {
  const tag = Object.values(tags).find(
    tag => match.startsWith(tag.open) && match.endsWith(tag.close)
  );

  if (tag === undefined) {
    return match;
  }

  const content = match.slice(tag.open.length, -tag.close.length);

  return tag.render(content);
};

const criticMarkupRule = state => {
  state.src = state.src.replace(regex, replaceCriticMarkup);
};

export const markdownItCriticMarkup = md => {
  md.core.ruler.before("block", "critic-markup", criticMarkupRule);
};

export default markdownItCriticMarkup;
