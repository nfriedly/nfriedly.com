# a very basic smoke test

if grep -q '<%=' "_site/index.html"; then
    echo 'Error: template code detected in output, aborting!'
    exit 1;
fi