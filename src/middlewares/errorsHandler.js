export const errorHandler = (err, req, res, next) => {
    console.log(err)
    const statusCode = err.statusCode || 500;

    const message = err.message || "Error interno del servidor!!!"

    res.status(statusCode).json({
        status: "Error",
        message
    })
}