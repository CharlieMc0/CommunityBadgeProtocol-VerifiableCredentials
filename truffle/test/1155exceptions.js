// const PREFIX = "Returned error: VM Exception while processing transaction: ";
// const PREFIX = "Error: ";
// const PREFIX = "Transaction: ";
const PREFIX = "Badges: ";

// Todo - Figure out why the errors don't report back from solidity as exepcted 

async function tryCatch(promise, message) {
    try {
        await promise;
        throw null;
    }
    catch (error) {
        assert(error, "Expected an error but did not get one");
        assert(error.message.startsWith(PREFIX + message), "Expected an error starting with '" + PREFIX + message + "' but got '" + error.message + "' instead");
    }
};

module.exports = {
    catchRevert            : async function(promise) {await tryCatch(promise, "revert"             );},
    catchOutOfGas          : async function(promise) {await tryCatch(promise, "out of gas"         );},
    catchInvalidJump       : async function(promise) {await tryCatch(promise, "invalid JUMP"       );},
    catchInvalidOpcode     : async function(promise) {await tryCatch(promise, "invalid opcode"     );},
    catchStackOverflow     : async function(promise) {await tryCatch(promise, "stack overflow"     );},
    catchStackUnderflow    : async function(promise) {await tryCatch(promise, "stack underflow"    );},
    catchStaticStateChange : async function(promise) {await tryCatch(promise, "static state change");},
    catchAll               : async function(promise) {await tryCatch(promise, ""                      );},
    catchTransfer               : async function(promise) {await tryCatch(promise, ""                      );},
    catchBadge               : async function(promise) {await tryCatch(promise, "Badge"                      );},

};