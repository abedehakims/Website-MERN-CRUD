export default (sequelize, Sequelize) => {
    const Mybini = sequelize.define("mybini", {
        title: {
            type: Sequelize.STRING,
        },
        description: {
            type: Sequelize.STRING,
        },
        published: {
            type: Sequelize.BOOLEAN,
        },
    });
    return Mybini;
};