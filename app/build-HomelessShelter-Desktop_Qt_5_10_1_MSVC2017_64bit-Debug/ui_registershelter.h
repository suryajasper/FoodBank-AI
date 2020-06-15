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
#include <QtWidgets/QLabel>
#include <QtWidgets/QMainWindow>
#include <QtWidgets/QMenuBar>
#include <QtWidgets/QScrollArea>
#include <QtWidgets/QStatusBar>
#include <QtWidgets/QVBoxLayout>
#include <QtWidgets/QWidget>

QT_BEGIN_NAMESPACE

class Ui_RegisterShelter
{
public:
    QWidget *centralwidget;
    QLabel *label;
    QLabel *label_2;
    QScrollArea *scrollArea;
    QWidget *scrollAreaWidgetContents;
    QWidget *verticalLayoutWidget;
    QVBoxLayout *verticalLayout;
    QMenuBar *menubar;
    QStatusBar *statusbar;

    void setupUi(QMainWindow *RegisterShelter)
    {
        if (RegisterShelter->objectName().isEmpty())
            RegisterShelter->setObjectName(QStringLiteral("RegisterShelter"));
        RegisterShelter->resize(920, 600);
        centralwidget = new QWidget(RegisterShelter);
        centralwidget->setObjectName(QStringLiteral("centralwidget"));
        label = new QLabel(centralwidget);
        label->setObjectName(QStringLiteral("label"));
        label->setGeometry(QRect(330, 20, 251, 51));
        QFont font;
        font.setPointSize(22);
        label->setFont(font);
        label_2 = new QLabel(centralwidget);
        label_2->setObjectName(QStringLiteral("label_2"));
        label_2->setGeometry(QRect(310, 60, 281, 41));
        QFont font1;
        font1.setPointSize(14);
        label_2->setFont(font1);
        scrollArea = new QScrollArea(centralwidget);
        scrollArea->setObjectName(QStringLiteral("scrollArea"));
        scrollArea->setGeometry(QRect(120, 110, 651, 441));
        scrollArea->setVerticalScrollBarPolicy(Qt::ScrollBarAlwaysOn);
        scrollArea->setWidgetResizable(true);
        scrollAreaWidgetContents = new QWidget();
        scrollAreaWidgetContents->setObjectName(QStringLiteral("scrollAreaWidgetContents"));
        scrollAreaWidgetContents->setGeometry(QRect(0, 0, 632, 439));
        verticalLayoutWidget = new QWidget(scrollAreaWidgetContents);
        verticalLayoutWidget->setObjectName(QStringLiteral("verticalLayoutWidget"));
        verticalLayoutWidget->setGeometry(QRect(20, 20, 611, 401));
        verticalLayout = new QVBoxLayout(verticalLayoutWidget);
        verticalLayout->setObjectName(QStringLiteral("verticalLayout"));
        verticalLayout->setSizeConstraint(QLayout::SetDefaultConstraint);
        verticalLayout->setContentsMargins(0, 0, 0, 0);
        scrollArea->setWidget(scrollAreaWidgetContents);
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
        label->setText(QApplication::translate("RegisterShelter", "Homeless Shelters", nullptr));
        label_2->setText(QApplication::translate("RegisterShelter", "Select the one you are working at", nullptr));
    } // retranslateUi

};

namespace Ui {
    class RegisterShelter: public Ui_RegisterShelter {};
} // namespace Ui

QT_END_NAMESPACE

#endif // UI_REGISTERSHELTER_H
