# v1.0.0 (Tue Nov 14 2023)

### Release Notes

#### [Breaking Change]: Replace babel-istanbul-plugin and replace it by a webpack loader ([#27](https://github.com/storybookjs/addon-coverage/pull/27))

- [BREAKING CHANGE]: Dropping Storybook < 7 support
- Replaced `babel-istanbul-plugin` with a custom Webpack loader to support coverage independently of the compiler used for Webpack5 projects. Before, the coverage addon only worked if Babel was used with Webpack5. Now, users might use other compilers like, for example, SWC.

---

#### 💥 Breaking Change

- [Breaking Change]: Replace babel-istanbul-plugin and replace it by a webpack loader [#27](https://github.com/storybookjs/addon-coverage/pull/27) ([@yannbf](https://github.com/yannbf) [@valentinpalkovic](https://github.com/valentinpalkovic))

#### 🐛 Bug Fix

- Migrate examples to Storybook 7 [#20](https://github.com/storybookjs/addon-coverage/pull/20) ([@yannbf](https://github.com/yannbf))

#### Authors: 2

- Valentin Palkovic ([@valentinpalkovic](https://github.com/valentinpalkovic))
- Yann Braga ([@yannbf](https://github.com/yannbf))

---

# v0.0.9 (Thu Jul 20 2023)

#### ⚠️ Pushed to `main`

- Create CODEOWNERS ([@valentinpalkovic](https://github.com/valentinpalkovic))

#### Authors: 1

- Valentin Palkovic ([@valentinpalkovic](https://github.com/valentinpalkovic))

---

# v0.0.8 (Mon Feb 06 2023)

#### 🐛 Bug Fix

- Set `forceBuildInstrument` only in production builds [#16](https://github.com/storybookjs/addon-coverage/pull/16) ([@yannbf](https://github.com/yannbf))

#### Authors: 1

- Yann Braga ([@yannbf](https://github.com/yannbf))

---

# v0.0.7 (Mon Nov 21 2022)

#### 🐛 Bug Fix

- Vite: generate code coverage in prod mode [#12](https://github.com/storybookjs/addon-coverage/pull/12) ([@yannbf](https://github.com/yannbf))

#### Authors: 1

- Yann Braga ([@yannbf](https://github.com/yannbf))

---

# v0.0.6 (Mon Nov 21 2022)

#### 🐛 Bug Fix

- Typescript: Provide types for Babel and Vite istanbul options [#10](https://github.com/storybookjs/addon-coverage/pull/10) ([@bryanjtc](https://github.com/bryanjtc) [@yannbf](https://github.com/yannbf))

#### Authors: 2

- Bryan Thomas ([@bryanjtc](https://github.com/bryanjtc))
- Yann Braga ([@yannbf](https://github.com/yannbf))

---

# v0.0.5 (Mon Oct 10 2022)

### Release Notes

#### Add Vite support ([#7](https://github.com/storybookjs/addon-coverage/pull/7))

The addon now supports Vite projects out of the box! If you had a custom instrumentation because this addon didn't support Vite, you are now free to remove it and just register it in the addons section of `.storybook/main.js` 🎉

---

#### 🐛 Bug Fix

- Add Vite support [#7](https://github.com/storybookjs/addon-coverage/pull/7) ([@yannbf](https://github.com/yannbf))
- chore: move examples to a separate folder [#6](https://github.com/storybookjs/addon-coverage/pull/6) ([@yannbf](https://github.com/yannbf))

#### 📝 Documentation

- Docs - fix cwd default value [#5](https://github.com/storybookjs/addon-coverage/pull/5) ([@penx](https://github.com/penx))

#### Authors: 2

- Alasdair McLeay ([@penx](https://github.com/penx))
- Yann Braga ([@yannbf](https://github.com/yannbf))

---

# v0.0.4 (Mon Aug 15 2022)

#### 🐛 Bug Fix

- fix scenario where plugins do not exist [#4](https://github.com/storybookjs/addon-coverage/pull/4) ([@yannbf](https://github.com/yannbf))

#### Authors: 1

- Yann Braga ([@yannbf](https://github.com/yannbf))

---

# v0.0.3 (Wed Aug 10 2022)

#### 🐛 Bug Fix

- Fix: update babel targets to support Storybook 7.0 [#3](https://github.com/storybookjs/addon-coverage/pull/3) ([@yannbf](https://github.com/yannbf))

#### Authors: 1

- Yann Braga ([@yannbf](https://github.com/yannbf))

---

# v0.0.2 (Mon Jul 11 2022)

#### 🐛 Bug Fix

- fix: add .storybook to exclude list [#2](https://github.com/storybookjs/addon-coverage/pull/2) ([@yannbf](https://github.com/yannbf))

#### Authors: 1

- Yann Braga ([@yannbf](https://github.com/yannbf))

---

# v0.0.1 (Tue Jun 21 2022)

#### 🐛 Bug Fix

- Add initial preset [#1](https://github.com/storybookjs/addon-coverage/pull/1) ([@yannbf](https://github.com/yannbf))

#### ⚠️ Pushed to `main`

- Initial commit ([@yannbf](https://github.com/yannbf))

#### Authors: 1

- Yann Braga ([@yannbf](https://github.com/yannbf))
