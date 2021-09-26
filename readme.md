    ./build.sh

    deno test src/core/recurse.test.js --coverage=cov_profile && deno coverage cov_profile --lcov > cov_profile.lcov && genhtml -o cov_profile/html cov_profile.lcov && sir -p 1235
