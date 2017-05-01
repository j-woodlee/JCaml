#/bin/sh
echo "Temporary Generator Tests:"
numtests=4
succeededtests=0;
./jcaml.js ./test/parser/variableTest.jml > ./test/generator/output.txt
diff ./test/generator/output.txt ./test/generator/expectedVarTest.txt
if [ $? = 0 ]
then
    echo "Variable test passed."
    ((succeededtests++))
else
    echo "Variable test failure."
    echo "Expected: "
    cat ./test/generator/expectedVarTest.txt
    echo "Received: "
    cat ./test/generator/output.txt
fi



./jcaml.js ./test/parser/one-liner.jml > ./test/generator/output.txt
diff ./test/generator/output.txt ./test/generator/expectedOneLiner.txt

if [ $? = 0 ]
then
    echo "One-liner test passed."
    ((succeededtests++))
else
    echo "One-liner test failure."
    echo "Expected: "
    cat ./test/generator/expectedOneLiner.txt
    echo "Received: "
    cat ./test/generator/output.txt
fi

./jcaml.js ./test/parser/list.jml > ./test/generator/output.txt
diff ./test/generator/output.txt ./test/generator/expectedList.txt

if [ $? = 0 ]
then
    echo "List test passed."
    ((succeededtests++))
else
    echo "List test failure."
    echo "Expected: "
    cat ./test/generator/expectedList.txt
    echo "Received: "
    cat ./test/generator/output.txt
fi

./jcaml.js ./test/parser/funcDec.jml > ./test/generator/output.txt
diff ./test/generator/output.txt ./test/generator/expectedFuncDec.txt

if [ $? = 0 ]
then
    echo "FuncDec test passed."
    ((succeededtests++))
else
    echo "FuncDec test failure."
    echo "Expected: "
    cat ./test/generator/expectedFuncDec.txt
    echo "Received: "
    cat ./test/generator/output.txt
fi

rm ./test/generator/output.txt

echo  $succeededtests "/" $numtests "tests passed."
