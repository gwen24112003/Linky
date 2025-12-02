const config = require('./tailwind.config.js');
const { sizes } = require('./src/theme');

console.log('--- Debugging Tailwind Config ---');
console.log('Sizes keys in theme:', Object.keys(sizes).filter(k => k === 'half'));

if (config.theme && config.theme.extend && config.theme.extend.minHeight) {
    console.log('minHeight in config:', Object.keys(config.theme.extend.minHeight).filter(k => k === 'half'));
    console.log('half value:', config.theme.extend.minHeight['half']);
} else {
    console.log('minHeight not found in config.theme.extend');
}
