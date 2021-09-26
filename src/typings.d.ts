/* eslint-disable prettier/prettier */
/**
 * Default CSS definition for typescript,
 * will be overridden with file-specific definitions by rollup
 */
declare module '*.scss' {
  const content: { [className: string]: string };
  export default content;
}
