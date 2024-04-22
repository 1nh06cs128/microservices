// User-defined table name
const tableName = "UserModelTable";

const UserModel = {
    AttributeDefinitions: [
        { AttributeName: "UserID", AttributeType: "S" }
    ],
    KeySchema: [
        { AttributeName: "UserID", KeyType: "HASH" },
    ],
    TableName: tableName,
    // Set provisioned throughput based on your expected usage (optional)
    ProvisionedThroughput: {
        ReadCapacityUnits: 2,
        WriteCapacityUnits: 2,
    },
};

export { UserModel }

/**
 * const UserModel = {
    AttributeDefinitions: [
        { AttributeName: "UserID", AttributeType: "S" }
        // { AttributeName: "Username", AttributeType: "S" },
        // { AttributeName: "Email", AttributeType: "S" },
        // { AttributeName: "FirstName", AttributeType: "S" },
        // { AttributeName: "LastName", AttributeType: "S" },
        // { AttributeName: "Age", AttributeType: "N" }, // Numeric data
        // { AttributeName: "IsAdmin", AttributeType: "B" }, // Boolean flag
        // { AttributeName: "Roles", AttributeType: "S" }, // Set of strings
        // { AttributeName: "Preferences", AttributeType: "S" }, // Nested key-value structure
        // { AttributeName: "RoleType", AttributeType: "S" },
        // { AttributeName: "Department", AttributeType: "S" },
        // { AttributeName: "Region", AttributeType: "S" },
        // { AttributeName: "InvitationDate", AttributeType: "S" },
        // { AttributeName: "ActivationDate", AttributeType: "S" },
        // { AttributeName: "TerminationDate", AttributeType: "S" },
        // { AttributeName: "CreatedAt", AttributeType: "S" },
        // { AttributeName: "UpdatedAt", AttributeType: "S" },
    ],
    KeySchema: [
        { AttributeName: "UserID", KeyType: "HASH" },
    ],
    TableName: tableName,
    // Set provisioned throughput based on your expected usage (optional)
    ProvisionedThroughput: {
        ReadCapacityUnits: 4,
        WriteCapacityUnits: 4,
    },
};

 */