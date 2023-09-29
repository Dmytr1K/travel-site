/* eslint-disable import/no-extraneous-dependencies */
const postcss = require("postcss");

const breakpoints = {
  base: { width: 0, coefficient: 0.383 },
  xxs: { width: 240, coefficient: 0.454 },
  xs: { width: 360, coefficient: 0.538 },
  sm: { width: 576, coefficient: 0.641 },
  md: { width: 768, coefficient: 0.77 },
  lg: { width: 992, coefficient: 0.885 },
  xl: { width: 1200, coefficient: 1 },
  xxl: { width: 1400, coefficient: 1.176 },
};

const parseValue = (value) =>
  value.split(" ").map((chunk) => {
    const parsedNumber = parseFloat(chunk);
    const regex = /[^0-9.]+/;
    const [identifier] = chunk.match(regex) ?? [null];
    const number = isNaN(parsedNumber) ? null : parsedNumber;
    const parsedValue = { number, identifier };

    return parsedValue;
  });

const getDeclarations = (nodes) => {
  const rawDeclarations = nodes.filter((node) => node.type === "decl");
  const declarations = rawDeclarations.map((declaration) => ({
    property: declaration.prop,
    values: parseValue(declaration.value),
  }));

  return declarations;
};

const handleValues = (values, coefficient) =>
  values.reduce((acc, { number, identifier }) => {
    const handledNumber = number !== null ? (number * coefficient).toFixed(3) : "";
    const handledIdentifier = identifier !== null ? identifier : "";

    return `${acc ? `${acc} ` : ""}${handledNumber}${handledIdentifier}`;
  }, null);

const recreateDeclaration = (declaration, coefficient) => {
  const handledValue = handleValues(declaration.values, coefficient);
  const newDeclaration = new postcss.Declaration({ prop: declaration.property, value: handledValue });

  return newDeclaration;
};

const adapt = (mixin) => {
  const declarations = getDeclarations(mixin.nodes);
  const { base, ...restPoints } = breakpoints;

  declarations.forEach((declaration) => {
    const newDeclaration = recreateDeclaration(declaration, base.coefficient);

    mixin.before(newDeclaration);
  });

  Object.values(restPoints).forEach((point) => {
    const rule = new postcss.AtRule({ name: "media", params: `(min-width: ${point.width}px)` });

    declarations.forEach((declaration) => {
      const newDeclaration = recreateDeclaration(declaration, point.coefficient);

      rule.append(newDeclaration);
    });

    mixin.before(rule);
  });
};

module.exports = adapt;
