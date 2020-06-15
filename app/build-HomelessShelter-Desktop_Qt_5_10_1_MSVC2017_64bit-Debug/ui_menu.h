/********************************************************************************
** Form generated from reading UI file 'menu.ui'
**
** Created by: Qt User Interface Compiler version 5.10.1
**
** WARNING! All changes made in this file will be lost when recompiling UI file!
********************************************************************************/

#ifndef UI_MENU_H
#define UI_MENU_H

#include <QtCore/QVariant>
#include <QtWidgets/QAction>
#include <QtWidgets/QApplication>
#include <QtWidgets/QButtonGroup>
#include <QtWidgets/QHeaderView>
#include <QtWidgets/QLabel>
#include <QtWidgets/QMainWindow>
#include <QtWidgets/QMenuBar>
#include <QtWidgets/QPushButton>
#include <QtWidgets/QStatusBar>
#include <QtWidgets/QWidget>

QT_BEGIN_NAMESPACE

class Ui_menu
{
public:
    QWidget *centralwidget;
    QPushButton *pushButton;
    QLabel *label;
    QLabel *label_2;
    QMenuBar *menubar;
    QStatusBar *statusbar;

    void setupUi(QMainWindow *menu)
    {
        if (menu->objectName().isEmpty())
            menu->setObjectName(QStringLiteral("menu"));
        menu->resize(800, 600);
        centralwidget = new QWidget(menu);
        centralwidget->setObjectName(QStringLiteral("centralwidget"));
        pushButton = new QPushButton(centralwidget);
        pushButton->setObjectName(QStringLiteral("pushButton"));
        pushButton->setGeometry(QRect(330, 240, 171, 31));
        label = new QLabel(centralwidget);
        label->setObjectName(QStringLiteral("label"));
        label->setGeometry(QRect(220, 70, 481, 91));
        QSizePolicy sizePolicy(QSizePolicy::Expanding, QSizePolicy::Preferred);
        sizePolicy.setHorizontalStretch(0);
        sizePolicy.setVerticalStretch(0);
        sizePolicy.setHeightForWidth(label->sizePolicy().hasHeightForWidth());
        label->setSizePolicy(sizePolicy);
        QFont font;
        font.setPointSize(28);
        label->setFont(font);
        label_2 = new QLabel(centralwidget);
        label_2->setObjectName(QStringLiteral("label_2"));
        label_2->setGeometry(QRect(340, 210, 161, 20));
        QFont font1;
        font1.setPointSize(12);
        label_2->setFont(font1);
        menu->setCentralWidget(centralwidget);
        menubar = new QMenuBar(menu);
        menubar->setObjectName(QStringLiteral("menubar"));
        menubar->setGeometry(QRect(0, 0, 800, 22));
        menu->setMenuBar(menubar);
        statusbar = new QStatusBar(menu);
        statusbar->setObjectName(QStringLiteral("statusbar"));
        menu->setStatusBar(statusbar);

        retranslateUi(menu);

        QMetaObject::connectSlotsByName(menu);
    } // setupUi

    void retranslateUi(QMainWindow *menu)
    {
        menu->setWindowTitle(QApplication::translate("menu", "MainWindow", nullptr));
        pushButton->setText(QApplication::translate("menu", "Click to Enter Your Information", nullptr));
        label->setText(QApplication::translate("menu", "Welcome to ", nullptr));
        label_2->setText(QApplication::translate("menu", "For new Inhabitants", nullptr));
    } // retranslateUi

};

namespace Ui {
    class menu: public Ui_menu {};
} // namespace Ui

QT_END_NAMESPACE

#endif // UI_MENU_H
