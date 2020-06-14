/********************************************************************************
** Form generated from reading UI file 'registershelter.ui'
**
** Created by: Qt User Interface Compiler version 5.10.1
**
** WARNING! All changes made in this file will be lost when recompiling UI file!
********************************************************************************/

#ifndef UI_REGISTERSHELTER_H
#define UI_REGISTERSHELTER_H

#include <QtCore/QVariant>
#include <QtWidgets/QAction>
#include <QtWidgets/QApplication>
#include <QtWidgets/QButtonGroup>
#include <QtWidgets/QHeaderView>
#include <QtWidgets/QMainWindow>
#include <QtWidgets/QMenuBar>
#include <QtWidgets/QStatusBar>
#include <QtWidgets/QWidget>

QT_BEGIN_NAMESPACE

class Ui_RegisterShelter
{
public:
    QWidget *centralwidget;
    QMenuBar *menubar;
    QStatusBar *statusbar;

    void setupUi(QMainWindow *RegisterShelter)
    {
        if (RegisterShelter->objectName().isEmpty())
            RegisterShelter->setObjectName(QStringLiteral("RegisterShelter"));
        RegisterShelter->resize(920, 600);
        centralwidget = new QWidget(RegisterShelter);
        centralwidget->setObjectName(QStringLiteral("centralwidget"));
        RegisterShelter->setCentralWidget(centralwidget);
        menubar = new QMenuBar(RegisterShelter);
        menubar->setObjectName(QStringLiteral("menubar"));
        menubar->setGeometry(QRect(0, 0, 920, 22));
        RegisterShelter->setMenuBar(menubar);
        statusbar = new QStatusBar(RegisterShelter);
        statusbar->setObjectName(QStringLiteral("statusbar"));
        RegisterShelter->setStatusBar(statusbar);

        retranslateUi(RegisterShelter);

        QMetaObject::connectSlotsByName(RegisterShelter);
    } // setupUi

    void retranslateUi(QMainWindow *RegisterShelter)
    {
        RegisterShelter->setWindowTitle(QApplication::translate("RegisterShelter", "MainWindow", nullptr));
    } // retranslateUi

};

namespace Ui {
    class RegisterShelter: public Ui_RegisterShelter {};
} // namespace Ui

QT_END_NAMESPACE

#endif // UI_REGISTERSHELTER_H
