pushd public/dist
mv polyfills.*.js polyfills.bundle.js
mv main.*.js main.bundle.js
mv styles.*.css styles.bundle.css
mv vendor.*.js vendor.bundle.js
mv inline.*.js inline.bundle.js
rm -fr assets
popd
