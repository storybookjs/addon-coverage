import { addons } from "@storybook/addons";
import { once } from "@storybook/client-logger";
import {
  STORY_RENDERED,
  STORY_PREPARED,
  SET_CURRENT_STORY,
  STORY_CHANGED,
  DOCS_RENDERED,
  STORY_SPECIFIED,
} from "@storybook/core-events";
import { EVENTS } from "../constants";

let initialValues = {} as Record<string, Record<number, number>>;

const channel = addons.getChannel();

// const originalValues = {} as Record<string | symbol, any>;
// const handler: ProxyHandler<typeof global.__coverage__> = {
//   get(target, prop) {
//     //@ts-ignore
//     return target[prop];
//   },
//   set(object, prop, value) {
//     console.log("setting", { object, prop, value });

//     // @ts-ignore
//     object[prop] = value;
//     return true;
//   },
// };

// global.__coverage__ = new Proxy({}, handler);

const getStoryStore = () => globalThis.__STORYBOOK_PREVIEW__.storyStore;

const getCoverage = () => {
  if (!globalThis.__coverage__) {
    once.warn("Trying to access coverage but it does not exist.");
  }

  return globalThis.__coverage__ || {};
};

channel.on(STORY_RENDERED, async (storyId) => {
  const currentStory = await getStoryStore().loadStory({ storyId });
  console.log("story is rendered!", storyId);
  const { coverage } = currentStory.parameters;

  if (coverage) {
    channel.emit(EVENTS.COVERAGE_DETAIL, {
      source: coverage.source,
      item: getCoverage()[coverage.filePath],
    });
  }
});

channel.on(STORY_PREPARED, (storyId) => {
  console.log("story is prepped!", storyId);
});

channel.on(STORY_CHANGED, (storyId) => {
  console.log("story is changed!", storyId);
});

channel.on(DOCS_RENDERED, (storyId) => {
  console.log("docs is rendered!", storyId);
});

channel.on(SET_CURRENT_STORY, async ({ storyId, viewMode }) => {
  console.log("story is set! time to reset stuff for ", storyId, viewMode);
  const currentStory = await getStoryStore().loadStory({ storyId });
  const { coverage } = currentStory.parameters;
  if (coverage) {
    if (initialValues[coverage.filePath]) {
      getCoverage()[coverage.filePath].s = {
        ...initialValues[coverage.filePath],
      };
    }
  }
});

channel.on(STORY_SPECIFIED, async ({ storyId, viewMode }) => {
  console.log("story is specified!", storyId, viewMode);
  const currentStory = await getStoryStore().loadStory({ storyId });
  const { coverage } = currentStory.parameters;
  if (coverage) {
    // Once Storybook bootstraps, store "original" values
    // so we can reset them before rendering a story
    Object.keys(getCoverage()).forEach((filePath) => {
      if (!initialValues[filePath]) {
        initialValues[filePath] = {
          ...getCoverage()[filePath].s,
        };
      } else {
        getCoverage()[filePath].s = {
          ...initialValues[filePath],
        };
      }
    });
  }
});
