module.exports = {
  multipass: false, // prefixIds does not work with multipass=true
  js2svg: {
    indent: 2,
    pretty: true
  },
  plugins: [
    'cleanupIDs',
    {
      name: 'prefixIds',
      params: {
        prefixClassNames: false // Respect class names in SVG
      }
    },
    'removeComments',
    'removeMetadata',
    'cleanupAttrs',
    'removeUselessDefs',
    'removeNonInheritableGroupAttrs',
    'removeHiddenElems',
    'removeEmptyText',
    'collapseGroups',
    'removeEmptyAttrs',
    'removeEmptyContainers',
    'removeUnusedNS',
    'removeTitle',
    'removeDesc'
  ]
};
