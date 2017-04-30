#/bin/sh
echo "Generator Tests:"
./jcaml.js ./test/parser/variableTest.jml > ./test/generator/output.txt
diff ./test/generator/output.txt ./test/generator/expectedVarTest.txt
if [ $? = 0 ]
then
    echo "Variable test passed."
else
    echo "Variable test failure."
    echo "Expected: "
    cat ./test/generator/expectedVarTest.txt
    echo "Received: "
    cat ./output.txt
fi



./jcaml.js ./test/parser/one-liner.jml > ./test/generator/output.txt
diff ./test/generator/output.txt ./test/generator/expectedOneLiner.txt

if [ $? = 0 ]
then
    echo "One-liner test passed."
else
    echo "Variable test failure."
    echo "Expected: "
    cat ./test/generator/expectedOneLiner.txt
    echo "Received: "
    cat ./test/generator/output.txt
fi

rm ./test/generator/output.txt
