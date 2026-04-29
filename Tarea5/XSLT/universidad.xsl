<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="/">
        <html>
        <head>
            <title>Transformación XSLT Universidad</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 40px; background-color: #f4f4f9; }
                h2 { color: #2c3e50; border-bottom: 2px solid #3498db; }
                table { width: 100%; border-collapse: collapse; margin-bottom: 30px; background: white; }
                th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
                th { background-color: #3498db; color: white; }
                tr:nth-child(even) { background-color: #f2f2f2; }
            </style>
        </head>
        <body>
            <h1>Resultados XSLT - Universidad</h1>

            <h2>1. Lista de Carreras</h2>
            <ul>
                <xsl:for-each select="universidad/carreras/carrera">
                    <li><xsl:value-of select="nombre"/></li>
                </xsl:for-each>
            </ul>

            <h2>2. Lista de Asignaturas</h2>
            <ul>
                <xsl:for-each select="universidad/asignaturas/asignatura">
                    <li><xsl:value-of select="nombre"/></li>
                </xsl:for-each>
            </ul>

            <h2>3. Alumnos (Apellidos, Nombre)</h2>
            <ul>
                <xsl:for-each select="universidad/alumnos/alumno">
                    <li>
                        <xsl:value-of select="apellido1"/> 
                        <xsl:text> </xsl:text>
                        <xsl:value-of select="apellido2"/>, 
                        <xsl:value-of select="nombre"/>
                    </li>
                </xsl:for-each>
            </ul>

            <h2>4. Tabla de Carreras</h2>
            <table>
                <tr>
                    <th>Nombre</th>
                    <th>Plan</th>
                    <th>Créditos Totales</th>
                </tr>
                <xsl:for-each select="universidad/carreras/carrera">
                    <tr>
                        <td><xsl:value-of select="nombre"/></td>
                        <td><xsl:value-of select="plan"/></td>
                        <td><xsl:value-of select="creditos"/></td>
                    </tr>
                </xsl:for-each>
            </table>

            <h2>5. Tabla de Asignaturas (Créditos)</h2>
            <table>
                <tr>
                    <th>Asignatura</th>
                    <th>Créditos Teóricos</th>
                    <th>Créditos Prácticos</th>
                </tr>
                <xsl:for-each select="universidad/asignaturas/asignatura">
                    <tr>
                        <td><xsl:value-of select="nombre"/></td>
                        <td><xsl:value-of select="creditos_teoricos"/></td>
                        <td><xsl:value-of select="creditos_practicos"/></td>
                    </tr>
                </xsl:for-each>
            </table>

        </body>
        </html>
    </xsl:template>
</xsl:stylesheet>