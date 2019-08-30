# Automatically links reaction to force for faster development

cd ../force

yarn

yalc link @artsy/reaction

n=0
until [ $n -ge 3 ]
do
  yarn --check-files && break

  echo "Installing reaction dependencies failed, retrying... ($n/3)"

  n=$[$n+1]
  sleep 1
done