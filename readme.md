    ./build.sh

    find src -type f | xargs -I '{}' perl -pi -e 'chomp if eof' {} && \
    deno test src/core/recurse.test.js --coverage=cov_profile && deno coverage cov_profile --lcov > cov_profile.lcov && genhtml --branch-coverage -o cov_profile/html cov_profile.lcov && \
    deno fmt src && \
    sir -p 1235
